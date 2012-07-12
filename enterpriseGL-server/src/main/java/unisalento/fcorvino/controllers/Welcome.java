/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import unisalento.fcorvino.model.ModelsFactory;

/**
 *
 * @author Francesco
 */
@Controller
@RequestMapping(value="/")
public class Welcome {
    
    private ModelsFactory entModelsFactory = new ModelsFactory();
 
    
    @RequestMapping(value="init")
    public String init(Model model){
        model.addAttribute(entModelsFactory.getModels());
        return "init";
    }
    
    @RequestMapping(value="create")
    public String createModel(){
        return "create";
    }
    
    @RequestMapping(value="edit")
    public String editModel(){
        return "edit";
    }
    
    @RequestMapping(value="view/{name}")
    public String viewModel(@PathVariable String name, Model model){
        Object entModel = entModelsFactory.getModel(name);
        if(entModel!=null) model.addAttribute(entModel);
        else {
            //TODO modello non trovato
        }
        return "view";
    }
    
}
