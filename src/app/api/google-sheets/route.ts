import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    console.log('Form data received:', formData);
    
    // Google Apps Script Webhook URL
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_SCRIPT_WEBHOOK_URL';
    
    // Determine product and price
    let product = formData.product || 'Course';
let price =
  product === 'Course'
    ? '17000 دج'
    : product === 'Challenge'
    ? '10000 دج'
    : product === 'دورة مكثفة'
    ? '6900 دج'
    : '8200 دج';
let status = 'Pending'; // Default status for new orders
    
    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: new Date().toISOString(),
      fullName: formData.fullName,
      phone: formData.phone,
      willaya: formData.willaya,
      city: formData.city,
      product: product,
      price: price,
      status: status,
      additionalNotes: formData.additionalNotes || '',
      source: 'Website Form'
    };
    
    console.log('Sending data to Google Sheets:', sheetData);
    console.log('Google Script URL:', GOOGLE_SCRIPT_URL);
    
    // Send data to Google Apps Script using POST
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(sheetData),
    });
    
    const responseText = await response.text();
    console.log('Google Sheets response status:', response.status);
    console.log('Google Sheets response body:', responseText);
    
    if (!response.ok) {
      throw new Error(`Failed to send data to Google Sheets: ${response.status} ${response.statusText}`);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      product: product,
      price: price,
      googleResponse: responseText
    });
    
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit form: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}
