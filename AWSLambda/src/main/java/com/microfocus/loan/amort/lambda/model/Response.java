package com.microfocus.loan.amort.lambda.model;

import java.util.ArrayList;
import java.util.List;

public class Response {

	private List<AmortData> amortList = new ArrayList<>();
	private String totalInterest;

	public List<AmortData> getAmortList() {
		return amortList;
	}

	public void setAmortList(List<AmortData> amortList) {
		this.amortList = amortList;
	}

	public String getTotalInterest() {
		return totalInterest;
	}

	public void setTotalInterest(String totalInterest) {
		this.totalInterest = totalInterest;
	}
}
