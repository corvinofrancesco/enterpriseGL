package unisalento.fcorvino.beans;

import java.util.Date;

/**
 *
 * @author Francesco Corvino
 */
public class Relation {
    private Particle source;
    private Particle destination;
    
    private Date init = null;
    private Date end = null;
    
    public Relation(Particle source, Particle destination){
        this.source = source;
        this.destination = destination;
    }

    public Particle getDestination() {
        return destination;
    }

    public void setDestination(Particle destination) {
        this.destination = destination;
    }

    public Particle getSource() {
        return source;
    }

    public void setSource(Particle source) {
        this.source = source;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public Date getInit() {
        return init;
    }

    public void setInit(Date init) {
        this.init = init;
    }
        
}
