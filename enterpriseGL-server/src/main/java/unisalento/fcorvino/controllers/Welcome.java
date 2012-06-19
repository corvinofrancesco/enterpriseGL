/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Francesco
 */
@Controller
@RequestMapping(value="/welcome")
public class Welcome {
    
    @RequestMapping(method= RequestMethod.GET)
    public String init(){
        return "init";
    }
    
}
