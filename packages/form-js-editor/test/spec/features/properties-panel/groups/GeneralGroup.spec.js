import { cleanup, fireEvent, render } from '@testing-library/preact/pure';

import { GeneralGroup } from '../../../../../src/features/properties-panel/groups';

import { MockPropertiesPanelContext, TestPropertiesPanel } from '../helper';
import { createMockInjector } from '../helper/mocks';

import { setEditorValue } from '../../../../helper';

import { set } from 'min-dash';

import { INPUTS, OPTIONS_INPUTS } from '../../../../../src/features/properties-panel/Util';

describe('GeneralGroup', function () {
  afterEach(function () {
    return cleanup();
  });

  describe('id', function () {
    it('should render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const idInput = findInput('id', container);

      expect(idInput).to.exist;
    });

    it('should NOT render for textfield', function () {
      // given
      const field = { type: 'textfield' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const idInput = findInput('id', container);

      expect(idInput).to.not.exist;
    });

    it('should read', function () {
      // given
      const field = {
        type: 'default',
        id: 'foobar',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // when
      const idInput = findInput('id', container);

      // then
      expect(idInput).to.exist;
      expect(idInput.value).to.equal('foobar');
    });

    it('should write', function () {
      // given
      const field = {
        type: 'default',
        id: 'foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const idInput = findInput('id', container);

      // when
      fireEvent.input(idInput, { target: { value: 'newVal' } });

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.id).to.equal('newVal');
    });
  });

  describe('versionTag', function () {
    it('should render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const versionTagInput = findInput('versionTag', container);

      expect(versionTagInput).to.exist;
    });

    it('should NOT render for textfield', function () {
      // given
      const field = { type: 'textfield' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const versionTagInput = findInput('versionTag', container);

      expect(versionTagInput).to.not.exist;
    });

    it('should read', function () {
      // given
      const field = {
        type: 'default',
        id: 'foobar',
        versionTag: 'v1',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // when
      const versionTagInput = findInput('versionTag', container);

      // then
      expect(versionTagInput).to.exist;
      expect(versionTagInput.value).to.equal('v1');
    });

    it('should write', function () {
      // given
      const field = {
        type: 'default',
        id: 'foobar',
        versionTag: 'v1',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const versionTagInput = findInput('versionTag', container);

      // when
      fireEvent.input(versionTagInput, { target: { value: 'newVal' } });

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.versionTag).to.equal('newVal');
    });
  });

  describe('label', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const labelInput = findFeelers('label', container);

      expect(labelInput).to.not.exist;
    });

    it('should NOT render for datetime', function () {
      // given
      const field = { type: 'datetime' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const labelInput = findFeelers('label', container);

      expect(labelInput).to.not.exist;
    });

    it('should render for button', function () {
      // given
      const field = { type: 'button' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const labelInput = findFeelers('label', container);

      expect(labelInput).to.exist;
    });

    it('should render for group', function () {
      // given
      const field = { type: 'group' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const labelInput = findFeelers('label', container);

      expect(labelInput).to.exist;
    });

    it('should render feel editor', function () {
      // given
      const field = {
        type: 'button',
        label: '=foobar',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const labelInput = findTextbox('label', container);
      expect(labelInput.textContent).to.equal('foobar');
    });

    describe('for datetime', function () {
      it('should render a date label in date subtype', function () {
        // when
        const { container } = renderGeneralGroup({ field: { type: 'datetime', subtype: 'date' } });

        // then
        const dateLabelInput = findFeelers('date-label', container);
        expect(dateLabelInput).to.exist;
        const timeLabelInput = findFeelers('time-label', container);
        expect(timeLabelInput).to.not.exist;
      });

      it('should render a time label in time subtype', function () {
        // when
        const { container } = renderGeneralGroup({ field: { type: 'datetime', subtype: 'time' } });

        // then
        const dateLabelInput = findFeelers('date-label', container);
        expect(dateLabelInput).to.not.exist;
        const timeLabelInput = findFeelers('time-label', container);
        expect(timeLabelInput).to.exist;
      });

      it('should render both date and time labels datetime subtype', function () {
        // when
        const { container } = renderGeneralGroup({ field: { type: 'datetime', subtype: 'datetime' } });

        // then
        const dateLabelInput = findFeelers('date-label', container);
        expect(dateLabelInput).to.exist;
        const timeLabelInput = findFeelers('time-label', container);
        expect(timeLabelInput).to.exist;
      });
    });

    it('should render for other INPUTS', function () {
      // given
      for (const type of INPUTS) {
        if (type === 'datetime') continue;

        const field = { type };

        // when
        const { container } = renderGeneralGroup({ field });

        // then
        const labelInput = findFeelers('label', container);
        expect(labelInput).to.exist;
      }
    });

    it('should read', function () {
      // given
      const field = {
        type: 'button',
        label: 'foobar',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      const labelInput = findFeelers('label', container);

      // then
      expect(labelInput).to.exist;
      expect(labelInput.textContent).to.equal('foobar');
    });

    it('should write', async function () {
      // given
      const field = {
        type: 'button',
        label: 'foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const feelers = findFeelers('label', container);
      const input = feelers.querySelector('div[contenteditable="true"]');

      // when
      await setEditorValue(input, 'newVal');

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.label).to.equal('newVal');
    });

    it('should write expression', async function () {
      // given
      const field = {
        type: 'button',
        label: '=foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const labelInput = findTextbox('label', container);

      // assume
      expect(labelInput.textContent).to.equal('foobar');

      // when
      await setEditorValue(labelInput, 'newVal');

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.label).to.equal('=newVal');
    });
  });

  describe('description', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const descriptionInput = findFeelers('description', container);

      expect(descriptionInput).to.not.exist;
    });

    it('should render for INPUTS', function () {
      // given
      for (const type of INPUTS.filter((type) => type !== 'filepicker')) {
        const field = { type };

        // when
        const { container } = renderGeneralGroup({ field });

        // then
        const descriptionInput = findFeelers('description', container);

        expect(descriptionInput).to.exist;
      }
    });

    it('should read', function () {
      // given
      const field = {
        type: 'number',
        description: 'foobar',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const descriptionInput = findFeelers('description', container);

      // then
      expect(descriptionInput).to.exist;
      expect(descriptionInput.textContent).to.equal('foobar');
    });

    it('should write', async function () {
      // given
      const field = {
        type: 'number',
        description: 'foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      // when
      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const feelers = findFeelers('description', container);
      const input = feelers.querySelector('div[contenteditable="true"]');

      // when
      await setEditorValue(input, 'newVal');

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.description).to.equal('newVal');
    });

    it('should write expression', async function () {
      // given
      const field = {
        type: 'number',
        description: '=foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const descriptionInput = findTextbox('description', container);

      // assume
      expect(descriptionInput.textContent).to.equal('foobar');

      // when
      await setEditorValue(descriptionInput, 'newVal');

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.description).to.equal('=newVal');
    });
  });

  describe('key', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const keyInput = findInput('key', container);

      expect(keyInput).to.not.exist;
    });

    it('should render for INPUTS', function () {
      // given
      for (const type of INPUTS) {
        const field = { type };

        // when
        const { container } = renderGeneralGroup({ field });

        // then
        const keyInput = findInput('key', container);

        expect(keyInput).to.exist;
      }
    });

    it('should read', function () {
      // given
      const field = {
        type: 'number',
        key: 'foobar',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const keyInput = findInput('key', container);

      // then
      expect(keyInput).to.exist;
      expect(keyInput.value).to.equal('foobar');
    });

    it('should write', function () {
      // given
      const field = {
        type: 'number',
        key: 'foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const keyInput = findInput('key', container);

      // when
      fireEvent.input(keyInput, { target: { value: 'newVal' } });

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.key).to.equal('newVal');
    });
  });

  describe('defaultValue', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const defaultValueInput = findInput('defaultValue', container);

      expect(defaultValueInput).to.not.exist;
    });

    describe('for singleSelect-like INPUTS', function () {
      const singleSelectInputTypes = ['radio', 'select'];

      it('should NOT render by default', function () {
        // given
        for (const type of singleSelectInputTypes) {
          const field = { type };

          // when
          const { container } = renderGeneralGroup({ field });

          // then
          const defaultValueEntry = findEntry('defaultValue', container);

          expect(defaultValueEntry).to.not.exist;
        }
      });

      it('should render when static values are defined', function () {
        // given
        for (const type of singleSelectInputTypes) {
          const field = { type, values: [{ value: 'value1', label: 'Value 1' }] };

          // when
          const { container } = renderGeneralGroup({ field });

          // then
          const defaultValueEntry = findEntry('defaultValue', container);

          expect(defaultValueEntry).to.exist;
        }
      });
    });

    describe('for multiSelect-like INPUTS', function () {
      const multiSelectInputTypes = ['taglist', 'checklist'];

      it('should NOT render by default', function () {
        // given
        for (const type of multiSelectInputTypes) {
          const field = { type };

          // when
          const { container } = renderGeneralGroup({ field });

          // then
          const defaultValueEntry = findEntry('defaultValue', container);

          expect(defaultValueEntry).to.not.exist;
        }
      });

      it('should NOT render when static values are defined', function () {
        // given
        for (const type of multiSelectInputTypes) {
          const field = { type, values: [{ value: 'value1', label: 'Value 1' }] };

          // when
          const { container } = renderGeneralGroup({ field });

          // then
          const defaultValueEntry = findEntry('defaultValue', container);

          expect(defaultValueEntry).to.not.exist;
        }
      });
    });

    describe('for all other INPUTS', function () {
      const nonDefaultValueInputs = new Set(['datetime', 'filepicker']);
      const defaultValueInputs = INPUTS.filter(
        (input) => !OPTIONS_INPUTS.includes(input) && !nonDefaultValueInputs.has(input),
      );

      it('should render', function () {
        // given
        for (const type of defaultValueInputs) {
          const field = { type };

          // when
          const { container } = renderGeneralGroup({ field });

          // then
          const defaultValueEntry = findEntry('defaultValue', container);

          expect(defaultValueEntry).to.exist;
        }
      });

      it('should not render', function () {
        // given
        for (const type of nonDefaultValueInputs) {
          const field = { type };

          // when
          const { container } = renderGeneralGroup({ field });

          // then
          const defaultValueEntry = findEntry('defaultValue', container);

          expect(defaultValueEntry).to.not.exist;
        }
      });
    });

    it('should read', function () {
      // given
      const field = {
        type: 'textfield',
        defaultValue: 'foobar',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const defaultValueInput = findInput('defaultValue', container);

      // then
      expect(defaultValueInput).to.exist;
      expect(defaultValueInput.value).to.equal('foobar');
    });

    it('should write', function () {
      // given
      const field = {
        type: 'textfield',
        defaultValue: 'foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const defaultValueInput = findInput('defaultValue', container);

      // when
      fireEvent.input(defaultValueInput, { target: { value: 'newVal' } });

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.defaultValue).to.equal('newVal');
    });
  });

  describe('action', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const actionInput = findSelect('action', container);

      expect(actionInput).to.not.exist;
    });

    it('should render for button', function () {
      // given
      const field = { type: 'button' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const actionInput = findSelect('action', container);

      expect(actionInput).to.exist;
    });

    it('should read', function () {
      // given
      const field = {
        type: 'button',
        action: 'submit',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const actionInput = findSelect('action', container);

      expect(actionInput).to.exist;
      expect(actionInput.value).to.equal('submit');
    });

    it('should write', function () {
      // given
      const field = {
        type: 'button',
        action: 'submit',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const actionInput = findSelect('action', container);

      // when
      fireEvent.input(actionInput, { target: { value: 'reset' } });

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.action).to.equal('reset');
    });
  });

  describe('text', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const textInput = findTextarea('text', container);

      expect(textInput).to.not.exist;
    });

    it('should render for text', function () {
      // given
      const field = { type: 'text' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const textInput = findFeelers('text', container);

      expect(textInput).to.exist;
    });

    it('should read', function () {
      // given
      const field = {
        type: 'text',
        text: 'foobar',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const feelers = findFeelers('text', container);

      expect(feelers).to.exist;
      expect(feelers.innerText).to.equal('foobar');
    });

    it('should write', async function () {
      // given
      const field = {
        type: 'text',
        text: 'foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const feelers = findFeelers('text', container);
      const input = feelers.querySelector('div[contenteditable="true"]');

      // when
      await setEditorValue(input, 'newVal');

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.text).to.equal('newVal');
    });

    it('should write (expression)', async function () {
      // given
      const field = {
        type: 'text',
        text: '=foobar',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const textBox = findTextbox('text', container);

      // when
      await setEditorValue(textBox, 'foo');

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.text).to.equal('=foo');
      expect(textBox.textContent).to.equal('foo');
    });
  });

  describe('disabled', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const disabledInput = findInput('disabled', container);

      expect(disabledInput).to.not.exist;
    });

    it('should render for INPUTS', function () {
      // given
      for (const type of INPUTS) {
        const field = { type };

        // when
        const { container } = renderGeneralGroup({ field });

        // then
        const disabledInput = findInput('disabled', container);

        expect(disabledInput).to.exist;
      }
    });

    it('should read', function () {
      // given
      const field = {
        type: 'number',
        disabled: true,
      };

      // when
      const { container } = renderGeneralGroup({ field });

      const disabledInput = findInput('disabled', container);

      // then
      expect(disabledInput).to.exist;
      expect(disabledInput.checked).to.equal(true);
    });

    it('should write', function () {
      // given
      const field = {
        type: 'number',
        disabled: true,
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const disabledInput = findInput('disabled', container);

      // when
      fireEvent.click(disabledInput);

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.disabled).to.equal(false);
    });
  });

  describe('readonly', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const readonlyInput = findInput('readonly', container);

      expect(readonlyInput).to.not.exist;
    });

    it('should render for INPUTS', function () {
      // given
      for (const type of INPUTS) {
        const field = { type };

        // when
        const { container } = renderGeneralGroup({ field });

        // then
        const readonlyInput = findInput('readonly', container);

        expect(readonlyInput).to.exist;
      }
    });

    it('should read', function () {
      // given
      const field = {
        type: 'number',
        readonly: true,
      };

      // when
      const { container } = renderGeneralGroup({ field });

      const readonlyInput = findInput('readonly', container);

      // then
      expect(readonlyInput).to.exist;
      expect(readonlyInput.checked).to.equal(true);
    });

    it('should write boolean', function () {
      // given
      const field = {
        type: 'number',
        readonly: true,
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const readonlyInput = findInput('readonly', container);

      // when
      fireEvent.click(readonlyInput);

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.readonly).to.equal(false);
    });

    it('should write expression', async function () {
      // given
      const field = {
        type: 'number',
        readonly: '=foo',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const readonlyInput = findTextbox('readonly', container);
      expect(readonlyInput.textContent).to.equal('foo');

      // when
      await setEditorValue(readonlyInput, 'bar');

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(editFieldSpy).to.have.been.calledWith(field, ['readonly'], '=bar');
    });
  });

  describe('subtype', function () {
    it('should render for datetime', function () {
      // given
      const field = { type: 'datetime' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const subtypeSelect = findSelect('subtype', container);
      expect(subtypeSelect).to.exist;
    });

    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const subtypeSelect = findSelect('subtype', container);
      expect(subtypeSelect).to.not.exist;
    });

    it('should read', function () {
      // given
      const field = {
        type: 'datetime',
        subtype: 'time',
      };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const subtypeSelect = findSelect('subtype', container);

      expect(subtypeSelect).to.exist;
      expect(subtypeSelect.value).to.equal('time');
    });

    it('should write and initialize (time => date)', function () {
      // given
      const field = {
        type: 'datetime',
        subtype: 'time',
        timeLabel: 'Time',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const subtypeSelect = findSelect('subtype', container);

      // when
      fireEvent.input(subtypeSelect, { target: { value: 'date' } });

      // then
      expect(editFieldSpy).to.have.been.calledWith(field, ['timeLabel'], undefined);
      expect(editFieldSpy).to.have.been.calledWith(field, ['dateLabel'], 'Date');
      expect(editFieldSpy).to.have.been.calledWith(field, ['subtype'], 'date');
      expect(field.subtype).to.equal('date');
    });

    it('should write and initialize (date => time)', function () {
      // given
      const field = {
        type: 'datetime',
        subtype: 'date',
        timeLabel: 'Date',
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const subtypeSelect = findSelect('subtype', container);

      // when
      fireEvent.input(subtypeSelect, { target: { value: 'time' } });

      // then
      expect(editFieldSpy).to.have.been.calledWith(field, ['timeLabel'], 'Time');
      expect(editFieldSpy).to.have.been.calledWith(field, ['timeSerializingFormat'], 'utc_offset');
      expect(editFieldSpy).to.have.been.calledWith(field, ['timeInterval'], 15);
      expect(editFieldSpy).to.have.been.calledWith(field, ['dateLabel'], undefined);
      expect(editFieldSpy).to.have.been.calledWith(field, ['subtype'], 'time');
      expect(field.subtype).to.equal('time');
    });
  });

  describe('use24h', function () {
    it('should NOT render for default', function () {
      // given
      const field = { type: 'default' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const disabledInput = findInput('disabled', container);

      expect(disabledInput).to.not.exist;
    });

    it('should not render for datetime (date)', function () {
      // given
      const field = { type: 'datetime', subtype: 'date' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const use24hInput = findInput('use24h', container);

      expect(use24hInput).to.not.exist;
    });

    it('should render for datetime (time)', function () {
      // given
      const field = { type: 'datetime', subtype: 'time' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const use24hInput = findInput('use24h', container);

      expect(use24hInput).to.exist;
    });

    it('should render for datetime (datetime)', function () {
      // given
      const field = { type: 'datetime', subtype: 'datetime' };

      // when
      const { container } = renderGeneralGroup({ field });

      // then
      const use24hInput = findInput('use24h', container);

      expect(use24hInput).to.exist;
    });

    it('should read', function () {
      // given
      const field = {
        type: 'datetime',
        subtype: 'time',
        use24h: true,
      };

      // when
      const { container } = renderGeneralGroup({ field });

      const disabledInput = findInput('use24h', container);

      // then
      expect(disabledInput).to.exist;
      expect(disabledInput.checked).to.equal(true);
    });

    it('should write', function () {
      // given
      const field = {
        type: 'datetime',
        subtype: 'time',
        use24h: true,
      };

      const editFieldSpy = sinon.spy((field, path, value) => set(field, path, value));

      const { container } = renderGeneralGroup({ field, editField: editFieldSpy });

      const use24hInput = findInput('use24h', container);

      // when
      fireEvent.click(use24hInput);

      // then
      expect(editFieldSpy).to.have.been.calledOnce;
      expect(field.use24h).to.equal(false);
    });
  });
});

// helper ///////////////

function buildGeneralGroupServiceMocks(options = {}) {
  return {
    templating: {
      isTemplate: options.isTemplate || (() => false),
    },
    pathRegistry: {
      getValuePath: options.getValuePath || ((field) => [field.key]),
      canClaimPath: options.canClaimPath || (() => true),
      claimPath: options.claimPath || (() => {}),
      unclaimPath: options.unclaimPath || (() => {}),
    },
  };
}

function renderGeneralGroup({ services, ...options }) {
  const { editField, field } = options;

  const defaultedServices = { ...buildGeneralGroupServiceMocks(options), ...services };

  const injector = createMockInjector(defaultedServices, options);

  const groups = [GeneralGroup(field, editField, (type, strict) => injector.get(type, strict))];

  return render(
    <MockPropertiesPanelContext options={options} services={defaultedServices}>
      <TestPropertiesPanel field={field} groups={groups} />
    </MockPropertiesPanelContext>,
  );
}

function findEntry(id, container) {
  return container.querySelector(`[data-entry-id="${id}"]`);
}

function findInput(id, container) {
  return container.querySelector(`input[name="${id}"]`);
}

function findSelect(id, container) {
  return container.querySelector(`select[name="${id}"]`);
}

function findTextarea(id, container) {
  return container.querySelector(`textarea[name="${id}"]`);
}

function findFeelers(id, container) {
  return container.querySelector(`[data-entry-id="${id}"] .bio-properties-panel-feelers-editor`);
}

function findTextbox(id, container) {
  return container.querySelector(`[name=${id}] [role="textbox"]`);
}
