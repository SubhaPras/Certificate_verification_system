export const certificateHTML = (student, certificateId) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial;
              padding: 40px;
              text-align: center;
            }
            .title {
              font-size: 32px;
              margin-bottom: 20px;
            }
            .name {
              font-size: 24px;
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              font-size: 14px;
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="title">Certificate of Completion</div>
          <div>This is to certify that</div>
          <div class="name">${student.name}</div>
          <div>has successfully completed the training in</div>
          <div><strong>${student.domain}</strong></div>
          <br/>
          <div>Certificate ID: <strong>${certificateId}</strong></div>
          <div>Duration: ${student.startDate} to ${student.endDate}</div>
  
          <div class="footer">
            Generated automatically by Certificate Verification System
          </div>
        </body>
      </html>
    `;
  };
  