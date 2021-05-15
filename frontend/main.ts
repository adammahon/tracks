import { VTag } from './components/VTag';
import { VCard } from './components/VCard';
import { VCardText } from './components/VCardText';
import { VCardTitle } from './components/VCardTitle';
import { VCardSubtitle } from './components/VCardSubtitle';
import { BTrackCard } from './components/BTrackCard';
import { BTopTracksCardList } from './components/BTopTracksCardList';

(window => {
    [
        {
            name: VTag.componentName,
            class: VTag
        },
        {
            name: VCard.componentName,
            class: VCard
        },
        {
            name: VCardText.componentName,
            class: VCardText
        },
        {
            name: VCardTitle.componentName,
            class: VCardTitle
        },
        {
            name: VCardSubtitle.componentName,
            class: VCardSubtitle
        },
        {
            name: BTrackCard.componentName,
            class: BTrackCard
        },
        {
            name: BTopTracksCardList.componentName,
            class: BTopTracksCardList
        }
    ].map(component => {
        window.customElements.define(component.name, component.class);
    });
})(window);
