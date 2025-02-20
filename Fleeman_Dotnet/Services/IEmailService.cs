namespace Fleeman_Dotnet.Services
{
    public interface IEmailService
    {
        Task sendEmail(String email, String username);
    }
}
