       01 OUTDATA.
           03 PAYMENTS OCCURS 1 TO 480 DEPENDING ON LOANTERM.
               05 OUTINTPAID     PIC $$,$$$.99.
               05 OUTPRINCPAID   PIC $$,$$$.99.
               05 OUTPAYMENT     PIC $$,$$$.99.
               05 OUTBALANCE     PIC $$$,$$$.99.
           03 OUTTOTINTPAID  PIC $$,$$$.99.
