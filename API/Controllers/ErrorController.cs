using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorController(DataContext context) : BaseApiController
    {
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetAuthError()
        {
            return "You are not authorized to access this resource.";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFoundError()
        {
            var results = context.Users.Find(-1);
            if (results == null)
            {
                return NotFound("Resource not found.");
            }

            return results;
        }


        [HttpGet("server-error")]
        public ActionResult<AppUser> GetServerError()
        {
            var results = context.Users.Find(-1) ?? throw new Exception("Server error occurred.");
            return results;

        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequestError()
        {
            return BadRequest("This is a bad request.");
        }
    }
}
