/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package unisalento.fcorvino.controllers;

import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import unisalento.fcorvino.beans.Model.ModelStatus;
import unisalento.fcorvino.model.ModelsFactory;

/**
 *
 * @author Francesco
 */
@Controller
@RequestMapping(value="/")
@SessionAttributes("modelBean")
public class Welcome {
    
    private ModelsFactory entModelsFactory = new ModelsFactory();
 
    @ModelAttribute("modelBean")
    public ModelBean createModelBean(){
        return new ModelBean();
    }
    
    @RequestMapping(method= RequestMethod.GET)
    public void form(){
        
    }
    
    @RequestMapping(value="init")
    public @ModelAttribute("models") List init(Model model){
        return entModelsFactory.getModels();
    }
    
    @RequestMapping(value="create")
    public String createModel(){
        return "create";
    }
    
    @RequestMapping(value="create",method= RequestMethod.POST)
    public String saveModel(@ModelAttribute ModelBean newModel){
        unisalento.fcorvino.beans.Model m = new unisalento.fcorvino.beans.Model();
        m.setName(newModel.getName());
        m.setLastChange(new Date());
        m.setStatus(ModelStatus.Incomplete);
        //TODO set other values
        entModelsFactory.addModel(m);
        return "redirect:/init";
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
