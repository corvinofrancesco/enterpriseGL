package unisalento.fcorvino.model;

import java.util.ArrayList;
import java.util.List;
import unisalento.fcorvino.beans.EntModel;

/**
 *
 * @author Francesco Corvino
 */
public class ModelsFactory {
    private static ArrayList<EntModel> models 
            = new ArrayList<EntModel>();
    
    public List getModels(){
        return models;
    }
    
    public EntModel getModel(String name){
        EntModel m = new EntModel();
        m.setName(name);
        Integer i = models.indexOf(m);
        if(i!=-1) return models.get(i);
        return null;
    }
    
    public void addModel(EntModel model){
        models.add(model);
    }

    public boolean remove(String name) {
        EntModel m = new EntModel();
        m.setName(name);
        return models.remove(m);
    }
}
