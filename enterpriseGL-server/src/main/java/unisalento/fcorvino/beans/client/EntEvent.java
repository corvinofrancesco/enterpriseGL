package unisalento.fcorvino.beans.client;

import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Francesco Corvino
 */
public class EntEvent extends EntItem {

    private ArrayList<String> objects = new ArrayList<String>();
    
    private Date date = new Date();
        
    public EntEvent() {
        this.setType("event");
    }
    
}
