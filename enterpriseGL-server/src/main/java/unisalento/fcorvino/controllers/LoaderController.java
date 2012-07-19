package unisalento.fcorvino.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import unisalento.fcorvino.beans.EntModel;
import unisalento.fcorvino.beans.models.EntModelConfigurations;
import unisalento.fcorvino.beans.models.EntModelPack;
import unisalento.fcorvino.model.ModelParser;
import unisalento.fcorvino.model.ModelsBuilder;

/**
 *
 * @author Francesco Corvino
 */
@Controller
@RequestMapping(value="/load")
@SessionAttributes({"model","parser"})
public class LoaderController {

    @RequestMapping(value="")
    public String loadModel(@ModelAttribute(value="model") EntModel m, Model model){
        ModelsBuilder builder = new ModelsBuilder();
        builder.setModel(m);
        ModelParser parser = builder.createParser();
        model.addAttribute("parser", parser);
        return "graphic";
    }
    
    @RequestMapping(value="/download/{idPack}")
    public @ResponseBody EntModelPack download(
            @PathVariable(value="idPack") Integer id,
            @ModelAttribute("parser") ModelParser parser){
        
        return parser.getPacket(id);
    }
    
    @RequestMapping(value="/config/{name}")
    public @ResponseBody EntModelConfigurations config(@PathVariable(value="name") String name){
        return new EntModelConfigurations();
    }
}
