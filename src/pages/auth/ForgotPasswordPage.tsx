import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flag, Mail, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';

type Step = 'email' | 'otp' | 'reset' | 'success';

const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP
    console.log('Sending OTP to:', email);
    // Simulate Google Sheets data capture
    const userData = {
      email,
      timestamp: new Date().toISOString(),
      action: 'forgot_password_request'
    };
    console.log('Capturing data to Google Sheets:', userData);
    setCurrentStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify OTP (mock verification)
    if (otp === '123456') {
      setCurrentStep('reset');
    } else {
      alert('Invalid OTP. Try 123456 for demo purposes.');
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Simulate password reset
    console.log('Password reset successful');
    // Capture successful reset to Google Sheets
    const resetData = {
      email,
      timestamp: new Date().toISOString(),
      action: 'password_reset_complete'
    };
    console.log('Capturing reset completion to Google Sheets:', resetData);
    setCurrentStep('success');
  };

  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Reset Your Password</h2>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a verification code to reset your password.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="email"
            type="email"
            placeholder="champion@f1street.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button variant="racing" size="lg" className="w-full">
        Send Verification Code
      </Button>
    </form>
  );

  const renderOtpStep = () => (
    <form onSubmit={handleOtpSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Enter Verification Code</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit verification code to{' '}
          <span className="font-semibold text-foreground">{email}</span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="pl-10 text-center text-lg tracking-widest"
            maxLength={6}
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          For demo purposes, use: <span className="font-mono bg-muted px-1 rounded">123456</span>
        </p>
      </div>

      <div className="space-y-3">
        <Button variant="racing" size="lg" className="w-full">
          Verify Code
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          className="w-full"
          onClick={() => {
            console.log('Resending OTP to:', email);
            alert('Verification code resent!');
          }}
        >
          Resend Code
        </Button>
      </div>
    </form>
  );

  const renderResetStep = () => (
    <form onSubmit={handlePasswordReset} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Create New Password</h2>
        <p className="text-muted-foreground">
          Enter your new password below. Make sure it's strong and secure.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <Button variant="racing" size="lg" className="w-full">
        Reset Password
      </Button>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-2">Password Reset Successful!</h2>
        <p className="text-muted-foreground">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
      </div>

      <Link to="/auth/login">
        <Button variant="racing" size="lg" className="w-full">
          Sign In Now
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-racing-carbon via-racing-gray to-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 racing-grid opacity-10" />
      <div className="absolute inset-0 speed-lines opacity-20" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back Navigation */}
        <div className="mb-6">
          {currentStep === 'email' ? (
            <Link to="/auth/login" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          ) : currentStep !== 'success' ? (
            <Button 
              variant="ghost" 
              onClick={() => {
                if (currentStep === 'otp') setCurrentStep('email');
                else if (currentStep === 'reset') setCurrentStep('otp');
              }}
              className="text-white/80 hover:text-white p-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : null}
        </div>

        <Card className="border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flag className="h-8 w-8 text-primary" />
              <span className="font-racing text-2xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                F1 STREET
              </span>
            </div>
            
            {/* Progress Indicator */}
            {currentStep !== 'success' && (
              <div className="flex justify-center mb-4">
                <div className="flex items-center gap-2">
                  {['email', 'otp', 'reset'].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep === step 
                          ? 'bg-primary text-primary-foreground' 
                          : index < ['email', 'otp', 'reset'].indexOf(currentStep)
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      {index < 2 && (
                        <div className={`w-8 h-0.5 mx-1 ${
                          index < ['email', 'otp', 'reset'].indexOf(currentStep)
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {currentStep === 'email' && renderEmailStep()}
            {currentStep === 'otp' && renderOtpStep()}
            {currentStep === 'reset' && renderResetStep()}
            {currentStep === 'success' && renderSuccessStep()}
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-6 text-center text-white/60 text-sm">
          <p>Your data is securely encrypted and stored</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;