package unisalento.fcorvino.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Francesco Corvino
 */
@Controller
@RequestMapping(value="/search")
public class SearchController {
    
    @RequestMapping(value="")
    public void form(){
        
    }
}
