package com.microfocus.loan.amort.lambda.model;

import com.microfocus.loan.amort.lambda.CalculateLoanHandler;

/**
 * POJO representing the {@link CalculateLoanHandler} input JSON. The input
 * contains the loan amount, the term in months and the interest rate per year.
 * 
 * @author Micro Focus
 */
public class Request {

	private int principal;
	private int term;
	private double rate;

	/**
	 * Gets the loan amount
	 * 
	 * @return the loan amount
	 */
	public int getPrincipal() {
		return principal;
	}

	public void setPrincipal(int principal) {
		this.principal = principal;
	}

	/**
	 * Gets the term in months
	 * 
	 * @return the term in months
	 */
	public int getTerm() {
		return term;
	}

	public void setTerm(int term) {
		this.term = term;
	}

	/**
	 * Gets the interest rate per year
	 * 
	 * @return the interest rate per year
	 */
	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}
}
