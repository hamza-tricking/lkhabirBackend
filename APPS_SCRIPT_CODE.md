function doPost(e) {
  try {
    // Log the full request for debugging
    Logger.log('Full request: ' + JSON.stringify(e));
    
    let data;
    
    // Extract data from postData.contents
    if (e.postData && e.postData.contents) {
      // Parse the contents string to get the actual data
      data = JSON.parse(e.postData.contents);
      Logger.log('Extracted data: ' + JSON.stringify(data));
    } else {
      Logger.log('No postData found');
      return ContentService.createTextOutput('ERROR: No postData');
    }
    
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
    
    // Create row with EXACT order matching headers
    const row = [
      data.timestamp || new Date().toISOString(),      // A: Timestamp
      data.fullName || 'No name',                      // B: Full Name
      data.phone || 'No phone',                        // C: Phone
      data.willaya || 'No willaya',                    // D: Willaya
      data.city || 'No city',                          // E: City
      data.price || 'No price',                        // F: Price
      data.additionalNotes || '',                       // G: Additional Notes
      'New'                                            // H: Status
    ];
    
    Logger.log('Row data to insert: ' + JSON.stringify(row));
    
    // Insert the row at the top (after headers)
    sheet.insertRowBefore(2);
    sheet.getRange(2, 1, 1, row.length).setValues([row]);
    
    Logger.log('Row added successfully at position 2');
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data added correctly',
      product: data.product,
      fullName: data.fullName,
      sheet: sheet.getName()
    }));
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }));
  }
}

// Test function for debugging
function testPost() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'Test User',
    phone: '123456789',
    willaya: 'الجزائر',
    city: 'الجزائر',
    product: 'Course',
    price: '17000 دج',
    additionalNotes: 'Test order',
    source: 'Test'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  doPost(e);
}
