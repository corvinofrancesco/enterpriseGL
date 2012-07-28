package unisalento.fcorvino.controllers;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.beans.EntModel.ModelStatus;
import unisalento.fcorvino.model.ModelsBuilder;
import unisalento.fcorvino.model.ModelsFactory;

/**
 *
 * @author Francesco Corvino
 */
@Controller
@RequestMapping(value = "/")
@SessionAttributes({"modelBean","model"})
public class Welcome {

    private ModelsFactory entModelsFactory = new ModelsFactory();

    @ModelAttribute("modelBean")
    public ModelBean createModelBean() {
        return new ModelBean();
    }

    @RequestMapping(method = RequestMethod.GET)
    public void form() {
    }
    
    @RequestMapping(value = "init",  headers="!ajaxRequest")
    public String initPage() {
        return "home";
    }
    
    @RequestMapping(value = "list")    
    public String listModels(Model model) {
        model.addAttribute("models", entModelsFactory.getModels());
        return "list";
    }

    @RequestMapping(value = "create")
    public String createModel() {
        return "create";
    }

    @RequestMapping(value = "create", method = RequestMethod.POST)
    public String saveModel(@ModelAttribute ModelBean newModel,Model model) {
        ModelsBuilder builder = new ModelsBuilder();
        builder.setName(newModel.getName());
        builder.setStatus(ModelStatus.Incomplete);
        builder.setType(newModel.getType());        
        if (builder.build()) {
            return listModels(model);
        }
        model.addAttribute("message", "Error: change name at model.. '" + newModel.getName() +"' is already used!");
        return this.createModel();
    }

    @RequestMapping(value = "edit/{name}")
    public String editModel(@PathVariable String name, Model model) {
        EntModel entModel = entModelsFactory.getModel(name);
        if(entModel==null) {
            model.addAttribute("message","The model "+ name + " don't exist");
            return this.listModels(model);
        }
        model.addAttribute("model",entModel);
        return "edit";
    }

    @RequestMapping(value = "delete/{name}")
    public String deleteModel(@PathVariable String name, Model model) {
        if(!entModelsFactory.remove(name)){
            model.addAttribute("message", "Error: '" + name +"' not deleted, contact the administrator.");
        }
        return this.listModels(model);
    }

    @RequestMapping(value = "view/{name}")
    public String viewModel(@PathVariable String name, Model model) {
        EntModel entModel = entModelsFactory.getModel(name);
        if(entModel != null) if(entModel.getStatus().equals(ModelStatus.Complete)){
            model.addAttribute("model", entModel);
            return "view";
        }
        model.addAttribute("message", "Error, non valid or incomplete model!");
        return editModel(name, model);
    }
    
}
