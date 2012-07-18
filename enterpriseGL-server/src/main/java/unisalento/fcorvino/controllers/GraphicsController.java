package unisalento.fcorvino.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import unisalento.fcorvino.beans.EntModel;

/**
 *
 * @author Francesco Corvino
 */
@Controller
@RequestMapping(value="/graphic")
@SessionAttributes({"model"})
public class GraphicsController {
    
    @RequestMapping(value="")
    public String defaultGraphic(){
        return "graphic";
    }
    
    public String modelGraphic( @ModelAttribute(value="model") EntModel m){
        return "redirect:/view/"+m.getName();
    }
}
