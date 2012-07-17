/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.controllers;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import unisalento.fcorvino.model.ModelsFactory;

/**
 *
 * @author Sara
 */
@Controller
@RequestMapping(value = "/", headers="!ajaxRequest")
public class Main {
    
    private ModelsFactory entModelsFactory = new ModelsFactory();

    @RequestMapping(value = "home")
    public @ModelAttribute("models")
    List init(Model model) {
        return entModelsFactory.getModels();
    }
}
