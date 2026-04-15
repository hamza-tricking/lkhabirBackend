# Google Sheets Integration Setup Instructions

## Step 1: Create Google Sheets (Two Separate Sheets)
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Orders Management" or similar
4. Create TWO sheets (tabs):

**Sheet 1: Course Orders**
- Rename the first tab to "Course Orders"
- Create these headers in the first row:
  - Timestamp
  - Full Name
  - Phone
  - Willaya
  - City
  - Price
  - Additional Notes
  - Status

**Sheet 2: USB Orders**
- Create a second tab (+ icon)
- Rename it to "USB Orders"
- Create these headers in the first row:
  - Timestamp
  - Full Name
  - Phone
  - Willaya
  - City
  - Price
  - Additional Notes
  - Status

## Step 2: Create Google Apps Script
1. In your Google Sheet, go to `Extensions` > `Apps Script`
2. Delete any existing code and paste this script:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Determine which sheet to use based on product type
    let sheet;
    if (data.product === 'Course') {
      sheet = spreadsheet.getSheetByName('CourseOrders') || spreadsheet.getSheets()[0];
    } else if (data.product === 'USB') {
      sheet = spreadsheet.getSheetByName('USBOrders') || spreadsheet.getSheets()[0];
    } else {
      // Default to first sheet if product not found
      sheet = spreadsheet.getSheets()[0];
    }
    
    // Add the data with proper columns
    sheet.appendRow([
      data.timestamp || new Date(),
      data.fullName || 'No name',
      data.phone || 'No phone',
      data.willaya || 'No willaya',
      data.city || 'No city',
      data.price || 'No price',
      data.additionalNotes || '',
      'New' // Default status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data added to ' + data.product + ' sheet successfully',
      product: data.product,
      sheet: sheet.getName()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function for Course Orders
function testCourseOrder() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test Course User',
    phone: '123456789',
    willaya: 'الجزائر',
    city: 'الجزائر',
    product: 'Course',
    price: '17000 دج',
    additionalNotes: 'Test course order',
    source: 'Test'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  doPost(e);
}

// Test function for USB Orders
function testUSBOrder() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test USB User',
    phone: '987654321',
    willaya: 'وهران',
    city: 'وهران',
    product: 'USB',
    price: '8200 دج',
    additionalNotes: 'Test USB order',
    source: 'Test'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  doPost(e);
}
```

## Step 3: Deploy as Web App
1. Save the script (Ctrl+S or Cmd+S)
2. Click on `Deploy` > `New deployment`
3. Choose `Web app` as the deployment type
4. Configure as follows:
   - Description: "Orders Management Webhook"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone" (important for web form submissions)
5. Click `Deploy`
6. Authorize the permissions when prompted
7. Copy the Web app URL (this is your GOOGLE_SCRIPT_URL)

## Step 4: Update Environment Variable
1. In your Next.js project, create or update `.env.local` file
2. Add this line (replace with your actual URL):
```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 5: Test the Integration
1. Restart your Next.js development server
2. Fill out the course form - should go to "Course Orders" sheet
3. Fill out the USB form - should go to "USB Orders" sheet
4. Check both sheets - data should appear in the correct sheet

## Additional Notes Field:
- The "Additional Notes" field will be empty initially
- You can manually add notes later for each order
- Future updates can include a notes field in the form
- Status field helps track order progress (New, Processing, Completed, etc.)

## Benefits of Separate Sheets:
- **Better Organization**: Course and USB orders are separated
- **Easy Reporting**: Generate reports for each product separately
- **Status Tracking**: Track progress for each order type
- **Future Notes**: Add manual notes for follow-up
- **Clean Data**: No mixing of different product types
