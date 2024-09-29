import React from 'react'
import { Form, FormControlProps, InputGroup } from 'react-bootstrap'

import styles from './index.module.scss';

export type PropsInput =
	//debe existir set o setHandle
	| (PropsInputBase & {
		set: (value: string) => void
		setHandle?: never
		name?: never
	})
	| (PropsInputBase & {
		setHandle: (e: React.ChangeEvent<HTMLInputElement>) => void
		set?: never
		name: string
	});

interface PropsInputBase {
	value: any
	disabled?: boolean
	label: string
	type: FormControlProps['type']
	minLength?: number
	required?: boolean
	className?: string
	version?: 'v1' | 'group'
}
const InputComponent: React.FC<PropsInput> = (props: PropsInput) => {

	if (props?.version === 'group') return (
		<>
			<InputGroup className={`${props?.className || 'mb-4'}`}>
				<InputGroup.Text id={props?.label}>{props?.label}</InputGroup.Text>
				<ControlComponent {...props} />
			</InputGroup>
		</>
	) 


	return (
		<>
			<div className={`${styles.input_group_text} ${props?.className || ''}`}>
				<Form.Label htmlFor={"input" + props?.label}>{props?.label}</Form.Label>
				<ControlComponent {...props} />
			</div>
		</>

	)
}

const ControlComponent: React.FC<PropsInput> = ({ label, set, value, disabled, type, minLength, required, setHandle, name}: PropsInput) => {
	return (
		<Form.Control
			required={required || false}
			type={type}
			name={name}
			id={"input" + label}
			aria-describedby={label + "Help"}
			value={value}
			disabled={disabled || false}
			minLength={minLength || 0}
			onChange={e => set ? set(e.target.value) : setHandle(e as any)}
		/>
	)
}

export default InputComponent;