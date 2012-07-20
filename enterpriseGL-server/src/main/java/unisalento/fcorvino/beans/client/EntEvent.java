package unisalento.fcorvino.beans.client;

import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Francesco Corvino
 */
public class EntEvent extends EntItem implements Comparable<EntEvent> {

    private ArrayList<String> objects = new ArrayList<String>();
    
    private ArrayList<EntChange> changes = new ArrayList<EntChange>();
    
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

    public ArrayList<String> getObjects() {
        return objects;
    }

    public void setObjects(ArrayList<String> objects) {
        this.objects = objects;
    }

    public ArrayList<EntChange> getChanges() {
        return changes;
    }

    public void setChanges(ArrayList<EntChange> changes) {
        this.changes = changes;
    }

    public int compareTo(EntEvent o) {
        if(o.getDate().after(date)) return 1;
        else if(o.getDate().before(date)) return -1;
        else return 0;
    }
        
}
