package com.microfocus.loan.amort.lambda;

import java.io.IOException;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.microfocus.loan.amort.lambda.model.Request;
import com.microfocus.loan.amort.lambda.model.Response;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class CalculateLoanHandlerTest {

	private static Request input;
	private final static String JSON = "{\n" + 
			"  \"principal\": \"50000\",\n" + 
			"  \"term\": \"60\",\n" + 
			"  \"rate\": \"3.5\"\n" + 
			"}"; 
	
	private static final ObjectMapper mapper = new ObjectMapper();
	
	@BeforeClass
	public static void createInput() throws IOException {
		 input = mapper.readValue(JSON.getBytes(), Request.class);
	}
	
	private Context createContext() {
		TestContext ctx = new TestContext();
		ctx.setFunctionName("CalculateLoanHandler");
		return ctx;
	}

	@Test
	public void testCalculateLoanHandler() {
		CalculateLoanHandler handler = new CalculateLoanHandler();
		Context ctx = createContext();

		Response output = handler.handleRequest(input, ctx);

		Assert.assertEquals(60, output.getAmortList().size());
		Assert.assertEquals("$4,575.21", output.getTotalInterest());
	}
}
