package unisalento.fcorvino.beans.models;

/**
 *
 * @author Francesco Corvino
 */
public class EntModelConfigurations {
    private Integer timeToWait = 200;
    private String typeDiagram = "graph";

    public Integer getTimeToWait() {
        return timeToWait;
    }

    public void setTimeToWait(Integer timeToWait) {
        this.timeToWait = timeToWait;
    }

    public String getTypeDiagram() {
        return typeDiagram;
    }

    public void setTypeDiagram(String typeDiagram) {
        this.typeDiagram = typeDiagram;
    }
    
}
