import { VTag } from './components/Tag';

(window => {
    [
        {
            name: VTag.componentName,
            class: VTag
        }
    ].map(component => {
        window.customElements.define(component.name, component.class);
    });
})(window);
