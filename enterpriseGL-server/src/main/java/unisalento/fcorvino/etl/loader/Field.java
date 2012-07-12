package unisalento.fcorvino.etl.loader;

import unisalento.fcorvino.etl.EtlLoadBean;
import unisalento.fcorvino.etl.EtlLoadBean.EtlLoadTypes;

/**
 *
 * @author Francesco Corvino
 */
public class Field {
    public Integer id;
    public EtlLoadBean.EtlLoadTypes type;
    public Object value;

    public Field(Integer id, EtlLoadTypes type, Object value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Field other = (Field) obj;
        if (this.id != other.id && (this.id == null || !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 13 * hash + (this.id != null ? this.id.hashCode() : 0);
        hash = 13 * hash + (this.type != null ? this.type.hashCode() : 0);
        hash = 13 * hash + (this.value != null ? this.value.hashCode() : 0);
        return hash;
    }

    
}
