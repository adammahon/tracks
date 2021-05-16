import { VTag } from './components/VTag';
import { VCard } from './components/VCard';
import { VCardText } from './components/VCardText';
import { VCardTitle } from './components/VCardTitle';
import { VCardSubtitle } from './components/VCardSubtitle';
import { VTrackCard } from './components/VTrackCard';
import { BTopTracksCardList } from './components/BTopTracksCardList';
import { BTopTracksFormControls } from './components/BTopTracksFormControls';
import { BTopTracks } from './components/BTopTracks';

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
            name: VTrackCard.componentName,
            class: VTrackCard
        },
        {
            name: BTopTracksCardList.componentName,
            class: BTopTracksCardList
        },
        {
            name: BTopTracksFormControls.componentName,
            class: BTopTracksFormControls
        },
        {
            name: BTopTracks.componentName,
            class: BTopTracks
        }
    ].map(component => {
        window.customElements.define(component.name, component.class);
    });
})(window);
