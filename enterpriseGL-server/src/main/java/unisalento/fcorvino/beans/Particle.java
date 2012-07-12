package unisalento.fcorvino.beans;

import java.util.Date;

/**
 * 
 * @author Francesco Corvino
 */
public class Particle {
    private Integer id;
    private String definition;
    private String description;
    private Date assumption;
    
    public Particle(Integer id){
        this.id = id;
    }

    public Date getAssumption() {
        return assumption;
    }

    public void setAssumption(Date assumption) {
        this.assumption = assumption;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    
}
