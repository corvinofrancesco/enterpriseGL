package unisalento.fcorvino.beans;

/**
 *
 * @author Francesco Corvino
 */
public class Relation {
    private Particle source;
    private Particle destination;
    
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
        
}
