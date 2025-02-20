
using Humanizer;
using MailKit.Security;
using MimeKit;

using MailKit.Net.Smtp;

namespace Fleeman_Dotnet.Services
{
    public class EmailService : IEmailService
    {

        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        public async Task sendEmail(string emailRe, string username)
        {

            var emailSettings = _configuration.GetSection("EmailSettings");

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("Fleeman", emailSettings["SenderEmail"]));
            email.To.Add(new MailboxAddress("", emailRe));
            email.Subject = "Booking Confirmation Mail";

            String emailTemplate = new String(File.ReadAllText("Resourses/templates/emailTemplate.html"));

            emailTemplate = emailTemplate.Replace("${name}", username);
            email.Body = new TextPart("html") { Text = emailTemplate };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(emailSettings["SmtpServer"], int.Parse(emailSettings["Port"]), SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(emailSettings["SenderEmail"], emailSettings["SenderPassword"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}
