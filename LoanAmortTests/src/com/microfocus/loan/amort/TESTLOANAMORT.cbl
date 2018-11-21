      ******************************************************************
      *
      * Copyright (C) Micro Focus 1984-2018. All rights reserved.
      *
      * This sample code is supplied for demonstration purposes only
      * on an "as is" basis and is for use at your own risk.
      *
      ******************************************************************

      *> Test Fixture for LOANAMORT program
      
       COPY "mfunit_prototypes".
      
      $set ilnamespace "com.microfocus.loan.amort"
       IDENTIFICATION DIVISION.
       PROGRAM-ID. TESTLOANAMORT.

       ENVIRONMENT DIVISION.

       DATA DIVISION.

       WORKING-STORAGE SECTION.
       78 TESTINTERESTPAID VALUE "TESTINTERESTPAID".
       78 TESTPAYMENTFIVE VALUE "TESTPAYMENTFIVE".
       78 TESTPRINCIPLEATTERMEND VALUE "TESTPRINCIPLEATTERMEND".
       
       COPY "mfunit".

       COPY AMORTIN.
       COPY AMORTOUT.

       PROCEDURE DIVISION.

      *> VERIFY THAT LOAN PROGRAM RETURNS THE EXPECTED TOTAL INTEREST AMOUNT
       ENTRY MFU-TC-PREFIX & TESTINTERESTPAID.

           MOVE 10000 TO PRINCIPAL
           MOVE 24 to LOANTERM
           MOVE 2.5 to RATE

           call "LOANAMORT" USING LOANINFO OUTDATA

           IF 262.50 = FUNCTION NUMVAL(OUTTOTINTPAID)
               GOBACK RETURNING MFU-PASS-RETURN-CODE
           ELSE
               EXHIBIT NAMED OUTTOTINTPAID
               GOBACK RETURNING MFU-FAIL-RETURN-CODE
           END-IF
       .

      *> VERIFY OUTPUT VALUES MATCH OUR EXPECTATIONS AFTER 5 PAYMENTS
       ENTRY MFU-TC-PREFIX & TESTPAYMENTFIVE.

           MOVE 10000 TO PRINCIPAL
           MOVE 24 to LOANTERM
           MOVE 2.5 to RATE

           call "LOANAMORT" USING LOANINFO OUTDATA

           IF 17.43 <> FUNCTION NUMVAL(OUTINTPAID OF PAYMENTS(5))
               EXHIBIT NAMED OUTINTPAID OF PAYMENTS(5)
               GOBACK RETURNING MFU-FAIL-RETURN-CODE
           END-IF

           IF 410.17 <> FUNCTION NUMVAL(OUTPRINCPAID OF PAYMENTS(5))
               EXHIBIT NAMED OUTPRINCPAID OF PAYMENTS(5)
               GOBACK RETURNING MFU-FAIL-RETURN-CODE
           END-IF

           IF 427.60 <> FUNCTION NUMVAL(OUTPAYMENT OF PAYMENTS(5))
               EXHIBIT NAMED OUTPAYMENT OF PAYMENTS(5)
               GOBACK RETURNING MFU-FAIL-RETURN-CODE
           END-IF

           IF 7958.00 <> FUNCTION NUMVAL(OUTBALANCE OF PAYMENTS(5))
               EXHIBIT NAMED OUTBALANCE OF PAYMENTS(5)
               GOBACK RETURNING MFU-FAIL-RETURN-CODE
           END-IF

           GOBACK RETURNING MFU-PASS-RETURN-CODE
       .

      *> VERIFY THAT THE PRINCIPLE IS ZERO AT THE END OF THE LOAN TERM
       ENTRY MFU-TC-PREFIX & TESTPRINCIPLEATTERMEND.

           MOVE 10000 TO PRINCIPAL
           MOVE 24 to LOANTERM
           MOVE 2.5 to RATE

           call "LOANAMORT" USING LOANINFO OUTDATA

           IF 0 <> FUNCTION NUMVAL(OUTBALANCE OF PAYMENTS(24))
               EXHIBIT NAMED OUTBALANCE OF PAYMENTS(24)
               GOBACK RETURNING MFU-FAIL-RETURN-CODE
           END-IF

           GOBACK RETURNING MFU-PASS-RETURN-CODE
       .
          
       END PROGRAM.
