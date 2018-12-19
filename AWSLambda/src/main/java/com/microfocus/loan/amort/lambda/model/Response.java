/****************************************************************************
 *
 *   Copyright (C) Micro Focus 1984-2018. All rights reserved.
 *
 *   This sample code is supplied for demonstration purposes only
 *   on an "as is" basis and is for use at your own risk.
 *
 ****************************************************************************/

package com.microfocus.loan.amort.lambda.model;

import java.util.ArrayList;
import java.util.List;

import com.microfocus.loan.amort.lambda.CalculateLoanHandler;

/**
 * POJO representing the {@link CalculateLoanHandler} output JSON. The output
 * contains the amortization schedule and the total interest paid.
 * 
 * @author Micro Focus
 */
public class Response {

	private List<AmortData> amortList = new ArrayList<>();
	private String totalInterest;

	/**
	 * Get a list with {@link AmortData} describing the amortization schedule
	 * 
	 * @return the data for the amortization schedule
	 */
	public List<AmortData> getAmortList() {
		return amortList;
	}

	public void setAmortList(List<AmortData> amortList) {
		this.amortList = amortList;
	}

	/**
	 * Gets the total interest paid
	 * 
	 * @return the total interest paid
	 */
	public String getTotalInterest() {
		return totalInterest;
	}

	public void setTotalInterest(String totalInterest) {
		this.totalInterest = totalInterest;
	}
}
