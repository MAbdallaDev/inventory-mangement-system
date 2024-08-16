<?php

namespace App\Notifications;

use Ichtrojan\Otp\Otp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordVerificationNotification extends Notification
{
    use Queueable;
    public $message;
    public $subject;
    public $otp;


    public function __construct()
    {
        $this->message='use the below code for reset password';
        $this->subject='Password Resetting';
        $this->otp=new Otp();
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $otp=$this->otp->generate($notifiable->email, 'numeric', 6, 60);
        return (new MailMessage)
            ->mailer('smtp')->subject($this->subject)
            ->line($this->message)->line("code :".$otp->token);
    }

    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
