package com.microfocus.loan.amort.lambda.model;

public class AmortData {
	private String payDateNo;
	private String interestPaid;
	private String principalPaid;
	private String payment;
	private String balance;

	public String getPayDateNo() {
		return payDateNo;
	}

	public void setPayDateNo(String payDateNo) {
		this.payDateNo = payDateNo;
	}

	public String getInterestPaid() {
		return interestPaid;
	}

	public void setInterestPaid(String interestPaid) {
		this.interestPaid = interestPaid;
	}

	public String getPrincipalPaid() {
		return principalPaid;
	}

	public void setPrincipalPaid(String principalPaid) {
		this.principalPaid = principalPaid;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}
}
