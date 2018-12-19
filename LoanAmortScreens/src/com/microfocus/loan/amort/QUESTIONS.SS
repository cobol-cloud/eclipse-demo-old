      ******************************************************************
      *
      * Copyright (C) Micro Focus 1984-2018. All rights reserved.
      *
      * This sample code is supplied for demonstration purposes only
      * on an "as is" basis and is for use at your own risk.
      *
      ******************************************************************

       01 G-QUESTIONS.
       COPY "APPLICATIONHEADER.SS".
         02 LINE 5 COL 1 "PRINCIPAL : "
         02 LINE 5 COL 13 USING P AUTO
         02 LINE 6 COL 1 "LOAN TERM : "
         02 LINE 6 COL 13 PIC ZZ9 USING T AUTO
         02 LINE 7 COL 1 "RATE      : "
         02 LINE 7 COL 13 PIC Z9.99 USING R AUTO 
         02 LINE 9 COL 1 FROM ERROR-MESSAGE