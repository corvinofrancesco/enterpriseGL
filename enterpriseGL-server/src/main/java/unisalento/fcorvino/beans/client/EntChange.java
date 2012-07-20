package unisalento.fcorvino.beans.client;

/**
 *
 * @author Francesco Corvino
 */
public class EntChange {
    
    public enum EntChangeTypes {
        INIT, END, UPDATED
    }
        
    private EntChangeTypes type;
    private EntParticle element;

    public EntChange() {
    }

    public EntChange(EntChangeTypes type, EntParticle element) {
        this.type = type;
        this.element = element;
    }

    public EntParticle getElement() {
        return element;
    }

    public void setElement(EntParticle element) {
        this.element = element;
    }

    public EntChangeTypes getType() {
        return type;
    }

    public void setType(EntChangeTypes type) {
        this.type = type;
    }
    
}