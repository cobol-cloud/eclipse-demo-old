package com.microfocus.loan.amort.lambda;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.microfocus.cobol.loan.amort.LOANAMORT;
import com.microfocus.cobol.loan.amort.Loaninfo;
import com.microfocus.cobol.loan.amort.Outdata;
import com.microfocus.cobol.runtimeservices.RunUnit;
import com.microfocus.loan.amort.lambda.model.AmortData;
import com.microfocus.loan.amort.lambda.model.Request;
import com.microfocus.loan.amort.lambda.model.Response;

public class CalculateLoanHandler implements RequestHandler<Request, Response> {

	@Override
	public Response handleRequest(Request request, Context context) {

		context.getLogger().log("Request:\n");
		context.getLogger().log("\tPrincipal: " + request.getPrincipal() + "\n");
		context.getLogger().log("\tTerm: " + request.getTerm() + "\n");
		context.getLogger().log("\tRate: " + request.getRate() + "\n");

		Outdata outData = new Outdata();
		Loaninfo loaninfo = new Loaninfo();
		loaninfo.setPrincipal(request.getPrincipal());
		loaninfo.setLoanterm(request.getTerm());

		loaninfo.setRate(BigDecimal.valueOf(request.getRate()));

		RunUnit myRunUnit = new RunUnit();
		try {
			LOANAMORT programInstance = new LOANAMORT();
			myRunUnit.Add(programInstance);
			programInstance.LOANAMORT(loaninfo, outData);
		} finally {
			// Destroy the run unit
			myRunUnit.StopRun();
			if (myRunUnit != null) {
				myRunUnit.close();
			}
		}

		Response response = new Response();
		LocalDate currDate = LocalDate.now();
		if (currDate.getDayOfMonth() > 28) {
			int daysAdjust = currDate.getDayOfMonth() - 28;
			currDate = currDate.plusDays(daysAdjust * -1);
		}

		for (int month = 0; month < request.getTerm(); month++) {
			LocalDate payDate = currDate.plusMonths(month);
			AmortData adObject = new AmortData();
			adObject.setPayDateNo(
					"#" + month + "    " + payDate.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.SHORT)));

			adObject.setInterestPaid(outData.getOutintpaid(month));
			adObject.setPrincipalPaid(outData.getOutprincpaid(month));
			adObject.setPayment(outData.getOutpayment(month));
			adObject.setBalance(outData.getOutbalance(month));
			response.getAmortList().add(adObject);
		}
		response.setTotalInterest(outData.getOuttotintpaid());

		context.getLogger().log("Response:\n");
		context.getLogger().log("\tRow count: " + response.getAmortList().size() + "\n");
		context.getLogger().log("\tTotal: " + response.getTotalInterest() + "\n");

		return response;
	}
}
