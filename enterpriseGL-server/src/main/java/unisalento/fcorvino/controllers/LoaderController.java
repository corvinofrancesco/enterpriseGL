package unisalento.fcorvino.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import unisalento.fcorvino.beans.models.EntModelConfigurations;
import unisalento.fcorvino.beans.models.EntModelPack;

/**
 *
 * @author Francesco Corvino
 */
@Controller
@RequestMapping(value="/loader/")
@SessionAttributes("model")
public class LoaderController {
    
    @RequestMapping(value="download/{idPack}")
    public @ResponseBody EntModelPack download(@PathVariable(value="idPack") Integer id){
        EntModelPack pack = new EntModelPack();
        pack.setIdPacket(id);
        pack.setLastPacket(false);
        return pack;
    }
    
    @RequestMapping(value="config/{name}")
    public @ResponseBody EntModelConfigurations config(@PathVariable(value="name") String name){
        return new EntModelConfigurations();
    }
}
