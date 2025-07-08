// Configuration
const RUPANTOR_API_KEY = 'YOUR_API_KEY';
const MERCHANT_ID = 'YOUR_MERCHANT_ID';
const STORE_ID = 'YOUR_STORE_ID';

// State
let selectedPackage = null;
let selectedMethod = null;

// Package selection
function selectPackage(pkgId) {
    selectedPackage = pkgId;
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('highlight');
    });
    event.currentTarget.classList.add('highlight');
    
    // Show payment form
    document.getElementById('payment-form').classList.remove('hidden');
    document.getElementById('payment-status').innerHTML = '';
    document.getElementById('payment-status').className = '';
}

// Payment method selection
function selectMethod(method) {
    selectedMethod = method;
    document.querySelectorAll('.method').forEach(m => {
        m.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Process payment
async function processPayment() {
    const telegramId = document.getElementById('telegram-id').value.trim();
    
    if (!selectedPackage) {
        showStatus('Please select a package first', 'error');
        return;
    }
    
    if (!selectedMethod) {
        showStatus('Please select a payment method', 'error');
        return;
    }
    
    if (!telegramId) {
        showStatus('Please enter your Telegram ID', 'error');
        return;
    }
    
    const packageInfo = getPackageInfo(selectedPackage);
    
    try {
        showStatus('Processing payment...');
        
        // In a real implementation, you would call your backend
        // which then calls RupantorPay API
        const paymentData = {
            merchant_id: MERCHANT_ID,
            store_id: STORE_ID,
            amount: packageInfo.price,
            currency: 'BDT',
            tran_id: `chegg_${Date.now()}`,
            cus_name: 'Chegg Customer',
            cus_email: 'user@example.com',
            cus_phone: '01XXXXXXXXX',
            package_id: selectedPackage,
            telegram_id: telegramId
        };
        
        // Simulate API call
        const paymentUrl = await simulateRupantorPayment(paymentData);
        
        // In reality, you would redirect to paymentUrl
        showStatus(`Payment initiated! Complete payment on RupantorPay`, 'success');
        
        // For demo purposes, we'll simulate a successful payment after 3 seconds
        setTimeout(() => {
            showStatus(`Payment successful! ${packageInfo.answers} answers added to your account. Check Telegram for confirmation.`, 'success');
        }, 3000);
        
    } catch (error) {
        showStatus(`Payment failed: ${error.message}`, 'error');
    }
}

// Helper functions
function getPackageInfo(pkgId) {
    const packages = {
        1: { answers: 1, price: 5 },
        3: { answers: 3, price: 15 },
        5: { answers: 5, price: 20 }
    };
    return packages[pkgId];
}

function showStatus(message, type = '') {
    const statusDiv = document.getElementById('payment-status');
    statusDiv.innerHTML = message;
    statusDiv.className = type;
}

// Simulate RupantorPay API call
function simulateRupantorPayment(data) {
    return new Promise((resolve, reject) => {
        // In a real implementation, you would use fetch() to call your backend
        // or RupantorPay API directly
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% success rate for demo
                resolve('https://rupantor.com/payment/checkout?token=simulated');
            } else {
                reject(new Error('Payment gateway timeout'));
            }
        }, 1000);
    });
}
