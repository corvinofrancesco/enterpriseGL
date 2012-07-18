package unisalento.fcorvino.etl;

import unisalento.fcorvino.beans.EntModel;

/**
 *
 * @author Francesco Corvino
 */
public interface EtlLoadBean<T> {
    public enum EtlLoadTypes {
        EtlText, EtlNumeric, EtlData
    };

    public void addField(Integer id, EtlLoadTypes type, Object value);
    
    public void addBeanTo(EntModel m);
    
    public T getBean();
    
    public void clearData();
}
