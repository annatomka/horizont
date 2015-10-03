package hu.co.horizont.exceptions;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

public class HorizontExceptionHandler implements HandlerExceptionResolver, Ordered {

	private static Logger log = Logger.getLogger(HorizontExceptionHandler.class);

	public int getOrder() {
		return Integer.MIN_VALUE;
	}

	public ModelAndView resolveException(HttpServletRequest aReq,
			HttpServletResponse response, Object aHandler, Exception ex) {
		log.error("Unhandled exception: ", ex);
		ModelAndView view = new ModelAndView();
		view.addObject("exception", ex.getClass().getSimpleName());

		if (ex instanceof AuthenticationException) {
			
			response.setStatus(((AuthenticationException) ex).getStatus());}
//		} else if (ex instanceof ResourceNotFoundException) {
//			view.addObject("resource_id",
//					((ResourceNotFoundException) ex).getResourceId());
//			view.addObject("resource_type",
//					((ResourceNotFoundException) ex).getResourceClass());
//			response.setStatus(((ResourceNotFoundException) ex).getStatus());
//		} else if (ex instanceof BadParameterException) {
//			response.setStatus(((BadParameterException) ex).getStatus());
//		} else {
//			response.setStatus(500);
//		}
		
		view.setView(new MappingJacksonJsonView());
		view.addObject("message", ex.getMessage());

		return view;
	}
}