import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { MouseEvent } from "react";
import useStore, { Tool } from "../../contexts/store";
import _ from "../../utils/translate";

export default function ToolPanel() {
  const store = useStore();

  const onClickTool = (tool: Tool) => (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    store.setTool(tool);
  };

  return <section className="panel">
    <h3 className="panel--title">{_('Outils')}</h3>
    <ul className="panel--grid">
      <li className={classNames(store.tool === 'pencil' && 'active')} title={_('Crayon')} onClick={onClickTool('pencil')}>
        <FontAwesomeIcon icon={icon({ name: 'pen', style: 'duotone' })} fixedWidth />
        <jf-tooltip>
          <h5>Outil crayon <span className="text-major">(C)</span></h5>
          <ul>
            <li><kbd>alt</kbd> {_('Gomme')}</li>
          </ul>
        </jf-tooltip>
      </li>
      <li className={classNames(store.tool === 'eraser' && 'active')} title={_('Gomme')} onClick={onClickTool('eraser')}>
        <FontAwesomeIcon icon={icon({ name: 'eraser', style: 'duotone' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'pipette' && 'active')} title={_('Pipette')} onClick={onClickTool('pipette')}>
        <FontAwesomeIcon icon={icon({ name: 'eye-dropper-half', style: 'duotone' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'fill' && 'active')} title={_('Pot de peinture')} onClick={onClickTool('fill')}>
        <FontAwesomeIcon icon={icon({ name: 'fill-drip', style: 'duotone' })} fixedWidth />
      </li>
    </ul>

    <h3 className="panel--title">{_('Formes')}</h3>
    <ul className="panel--grid">
      <li className={classNames(store.tool === 'line' && 'active')} title={_('Ligne')} onClick={onClickTool('line')}>
        <FontAwesomeIcon icon={icon({ name: 'slash', style: 'duotone' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'square' && 'active')} title={_('Carré')} onClick={onClickTool('square')}>
        <FontAwesomeIcon icon={icon({ name: 'square', style: 'regular' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'circle' && 'active')} title={_('Cercle')} onClick={onClickTool('circle')}>
        <FontAwesomeIcon icon={icon({ name: 'circle', style: 'regular' })} fixedWidth />
      </li>
    </ul>

    <h3 className="panel--title">{_('Zooms')}</h3>
    <ul className="panel--grid">
      <li className={classNames(store.tool === 'zoom-in' && 'active')} title={_('Zoomer')} onClick={onClickTool('zoom-in')}>
        <FontAwesomeIcon icon={icon({ name: 'magnifying-glass-plus', style: 'duotone' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'zoom-out' && 'active')} title={_('Dézoomer')} onClick={onClickTool('zoom-out')}>
        <FontAwesomeIcon icon={icon({ name: 'magnifying-glass-minus', style: 'duotone' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'zoom-reset' && 'active')} title={_('Réinitialiser le zoom')} onClick={onClickTool('zoom-reset')}>
        <FontAwesomeIcon icon={icon({ name: 'magnifying-glass', style: 'duotone' })} fixedWidth />
      </li>
    </ul>

    <h3 className="panel--title">{_('Miroirs')}</h3>
    <ul className="panel--grid">
      <li className={classNames(store.tool === 'pipette' && 'active')} title={_('Miroir horizontal')} onClick={onClickTool('pipette')}>
        <FontAwesomeIcon icon={icon({ name: 'colon', style: 'duotone' })} fixedWidth />
      </li>
      <li style={{ color: 'transparent' }}>
        <FontAwesomeIcon icon={icon({ name: 'times' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'resize' && 'active')} title={_('Miroir vertical')} onClick={onClickTool('resize')}>
        <FontAwesomeIcon icon={icon({ name: 'colon', style: 'duotone' })} fixedWidth transform="rotate-270" />
      </li>
    </ul>

    <h3 className="panel--title">{_('Images')}</h3>
    <ul className="panel--grid">
      <li className={classNames(store.tool === 'resize' && 'active')} title={_('Redimensionner')} onClick={onClickTool('resize')}>
        <FontAwesomeIcon icon={icon({ name: 'crop-simple', style: 'duotone' })} fixedWidth />
      </li>
      <li className={classNames(store.tool === 'resize' && 'active')} title={_('Redimensionner')} onClick={onClickTool('resize')}>
        <FontAwesomeIcon icon={icon({ name: 'image', style: 'duotone' })} fixedWidth />
      </li>
    </ul>
  </section>;
}
