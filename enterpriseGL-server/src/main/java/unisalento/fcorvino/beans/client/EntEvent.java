package unisalento.fcorvino.beans.client;

import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Francesco Corvino
 */
public class EntEvent extends EntItem implements Comparable<EntEvent> {

    private ArrayList<Integer> objects = new ArrayList<Integer>();
    
    private Date date = new Date();
        
    public EntEvent() {
        this.setType("event");
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ArrayList<Integer> getObjects() {
        return objects;
    }

    public void setObjects(ArrayList<Integer> objects) {
        this.objects = objects;
    }

    public int compareTo(EntEvent o) {
        if(o.getDate().after(date)) return 1;
        else if(o.getDate().before(date)) return -1;
        else return 0;
    }
    
}
