package unisalento.fcorvino.beans.client;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Francesco Corvino
 */
public class EntItem {
    private String id;
    private String type = "particle";
    private String title;
    private String description;
    private String definition;
    private Map<String,Object> properties = new HashMap<String, Object>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Map<String, Object> getProperties() {
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Object put(String key, Object value) {
        return properties.put(key, value);
    }

    public Object get(String key) {
        return properties.get(key);
    }

    public EntItem() {
    }

    public EntItem(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final EntItem other = (EntItem) obj;
        if ((this.id == null) ? (other.id != null) : !this.id.equals(other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 41 * hash + (this.id != null ? this.id.hashCode() : 0);
        hash = 41 * hash + (this.type != null ? this.type.hashCode() : 0);
        hash = 41 * hash + (this.title != null ? this.title.hashCode() : 0);
        return hash;
    }
    
}
