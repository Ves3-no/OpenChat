using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("Message")]

    
    public class MessagesController : ControllerBase
    {
        
        static List<Content> Messages = new List<Content>();
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Messages);
        }
        [HttpPost]
        public IActionResult Post([FromBody] MessageRequest Message)
        {
            Messages.Add(new Content { Message = Message.Message, Username = Message.Username });
            return Ok(Messages);

        }
        
    }
    public class Content
    {
        public string Message { get; set; }
        public string Username { get; set; }
    }
    public class MessageRequest
    {
        public string Message { get; set; }
        public string Username { get; set; }
    }
}
