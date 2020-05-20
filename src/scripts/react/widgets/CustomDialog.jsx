import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Zoom from 'react-medium-image-zoom'
import { Carousel, Table, Image, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFossil } from './CustomIcons.jsx'
import { faCircle, faMoneyBillAlt, faMapMarkerAlt, faFish, faCalendarAlt, faClock, faStar } from '@fortawesome/free-solid-svg-icons'
import TimeBar from './TimeBar.jsx'

export default class CustomDialog extends Component {
	constructor(props) {
		super(props)

		this.handelConvertColorCode = this.handelConvertColorCode.bind(this)
	}

	handelConvertColorCode(hemisphere, item) {
		let result = '#E9EBEE'
		let dateNow = new Date()

		let itemMonths = hemisphere == 'northern' ? item.northernMonths : item.southernMonths
		let itemHours = item.appearanceTime

		if (itemMonths.includes(dateNow.getMonth() + 1) && itemHours.includes(dateNow.getHours() == 0 ? 24 : dateNow.getHours())) {
			result = '#42B72A'
		} else {
			result = '#FF0000'
		}

		if (item.chineseName == '') {
			result = '#E9EBEE'
		}

		return result
	}

	render() {
		return (
			<Modal show={this.props.isDialogShow} onHide={() => this.props.onHide()}>
				<Modal.Header closeButton>
					<Modal.Title>
						{['fish', 'bug'].includes(this.props.type) ?
							<React.Fragment>
								<span style={{ color: this.handelConvertColorCode('northern', this.props.activeItem) }}>
									<FontAwesomeIcon icon={faCircle} style={{ verticalAlign: 'middle', fontSize: 'x-small' }} />{' 北半球'}
								</span>
								{' / '}
								<span style={{ color: this.handelConvertColorCode('southern', this.props.activeItem) }}>
									<FontAwesomeIcon icon={faCircle} style={{ verticalAlign: 'middle', fontSize: 'x-small' }} />{' 南半球'}
								</span>
							</React.Fragment>
							: '　'
						}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table className={'dialog'} hover={true}>
						<tbody>
							{['fish', 'bug', 'fossil'].includes(this.props.type) ?
								<tr>
									<th colSpan={'2'} style={{ textAlign: 'center' }} >
										{this.props.isMarked ?
											<FontAwesomeIcon
												icon={faStar}
												style={{ position: 'absolute', left: '15px', color: '#FFC107' }}
											/>
											: <React.Fragment />
										}
										<Zoom>
											<Image src={this.props.activeItem.imageUrl} fluid={true} />
										</Zoom>
										<h4 className={'font-weight-bold'}>
											{this.props.activeItem.chineseName}<br />
											{this.props.activeItem.englishName}
										</h4>
									</th>
								</tr>
								: <React.Fragment />
							}
							{['art'].includes(this.props.type) ?
								<tr>
									<th colSpan={'2'} style={{ textAlign: 'center' }} >
										{this.props.isMarked ?
											<FontAwesomeIcon
												icon={faStar}
												style={{ position: 'absolute', left: '15px', color: '#FFC107' }}
											/>
											: <React.Fragment />
										}
										<Carousel>
											<Carousel.Item>
												<Zoom>
													<Image src={this.props.activeItem.imageUrl} fluid={true} />
												</Zoom>
												<Carousel.Caption>{'真品'}</Carousel.Caption>
											</Carousel.Item>
											<Carousel.Item>
												<Zoom>
													<Image src={this.props.activeItem.imageUrlForgery} fluid={true} />
												</Zoom>
												<Carousel.Caption>{'贗品'}</Carousel.Caption>
											</Carousel.Item>
										</Carousel>
										<h4 className={'font-weight-bold'}>
											{this.props.activeItem.chineseName}<br />
											{this.props.activeItem.englishName}
										</h4>
									</th>
								</tr>
								: <React.Fragment />
							}
							{['fish', 'bug', 'fossil'].includes(this.props.type) ?
								<tr>
									<th style={{ width: '30%', textAlign: 'center' }}>
										<h5><FontAwesomeIcon icon={faMoneyBillAlt} />{' 價錢'}</h5>
									</th>
									<td>
										<h5>
											{this.props.activeItem.price}
											<small>{' 鈴錢'}</small>
										</h5>
									</td>
								</tr>
								: <React.Fragment />
							}
							{['fish', 'bug'].includes(this.props.type) ?
								<tr>
									<th style={{ textAlign: 'center' }}>
										<h5><FontAwesomeIcon icon={faMapMarkerAlt} />{' 地點'}</h5>
									</th>
									<td>
										<h5>{this.props.activeItem.location}</h5>
										{this.props.activeItem.remark != '' ? <small>{'※ ' + this.props.activeItem.remark}</small> : ''}
									</td>
								</tr>
								: <React.Fragment />
							}
							{['fossil'].includes(this.props.type) ?
								<tr>
									<th style={{ textAlign: 'center' }}>
										<h5><FontAwesomeIcon icon={faFossil} />{' 系列'}</h5>
									</th>
									<td>
										<h5>{this.props.activeItem.series}</h5>
										{this.props.activeItem.remark != '' ? <small>{'※ ' + this.props.activeItem.remark}</small> : ''}
									</td>
								</tr>
								: <React.Fragment />
							}
							{['fish'].includes(this.props.type) ?
								<tr>
									<th style={{ textAlign: 'center' }}>
										<h5><FontAwesomeIcon icon={faFish} />{' 魚影'}</h5>
									</th>
									<td>
										<h5>{this.props.activeItem.shadowSize}</h5>
									</td>
								</tr>
								: <React.Fragment />
							}
							{['fish', 'bug'].includes(this.props.type) ?
								<tr>
									<th style={{ textAlign: 'center' }}>
										<label><FontAwesomeIcon icon={faCalendarAlt} />{' 北半球月份'}</label>
									</th>
									<td>
										<TimeBar type={'month'} data={this.props.activeItem.northernMonths} />
									</td>
								</tr>
								: <React.Fragment />
							}
							{['fish', 'bug'].includes(this.props.type) ?
								<tr>
									<th style={{ textAlign: 'center' }}>
										<label><FontAwesomeIcon icon={faCalendarAlt} />{' 南半球月份'}</label>
									</th>
									<td>
										<TimeBar type={'month'} data={this.props.activeItem.southernMonths} />
									</td>
								</tr>
								: <React.Fragment />
							}
							{['fish', 'bug'].includes(this.props.type) ?
								<tr>
									<th style={{ textAlign: 'center' }}>
										<h5><FontAwesomeIcon icon={faClock} />{' 時間'}</h5>
									</th>
									<td>
										<TimeBar type={'hour'} data={this.props.activeItem.appearanceTime} />
									</td>
								</tr>
								: <React.Fragment />
							}
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='primary'
						active={this.props.isMarked}
						onClick={() => this.props.onChangeMarked(this.props.type, this.props.activeItem.index)}
					><FontAwesomeIcon icon={faStar} />{this.props.isMarked ? ' 取消標記' : ' 標記'}</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

CustomDialog.defaultProps = {
	type: 'bug',
	isDialogShow: false,
	onHide: () => { },
	activeItem: {
		index: 0,
		imageUrl: '',
		imageUrlForgery: '',
		chineseName: '',
		englishName: '',
		price: 0,
		location: '',
		series: '',
		northernMonths: [],
		southernMonths: [],
		appearanceTime: [],
		remark: ''
	},
	isMarked: false,
	onChangeMarked: () => { }
}

CustomDialog.propTypes = {
	type: PropTypes.string,
	isDialogShow: PropTypes.bool,
	onHide: PropTypes.func,
	activeItem: PropTypes.object,
	isMarked: PropTypes.bool,
	onChangeMarked: PropTypes.func
}