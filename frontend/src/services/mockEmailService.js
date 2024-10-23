// mockEmailService.js
export const sendWelcomeEmail = async (name, email) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  
    // Simulate email content
    const emailContent = {
      to: email,
      subject: "Welcome to Our Platform!",
      body: `
        Dear ${name},
  
        Welcome to our platform! We're excited to have you on board.
        
        Here are some quick links to get you started:
        - Complete your profile
        - Explore our features
        - Read our documentation
        
        If you have any questions, feel free to reach out to our support team.
  
        Best regards,
        The Team
      `
    };
  
    console.log('Simulated email sent:', emailContent);
    return {
      success: true,
      messageId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  };