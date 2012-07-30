package unisalento.fcorvino.beans.client;

import java.util.ArrayList;

/**
 *
 * @author Francesco Corvino
 */
public class EntParticle extends EntItem {    
    private ArrayList<String> relations = new ArrayList<String>();

    public ArrayList<String> getRelations() {
        return relations;
    }

    public void setRelations(ArrayList<String> relations) {
        this.relations = relations;
    }

    public EntParticle() {
    }

    public EntParticle(String id) {
        super(id);
    }
    
}
