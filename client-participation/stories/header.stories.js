import React from 'react'

import Header from '../vis2/components/header'

export default {
  title: 'Visualization/Header',
  component: Header,
}

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
  conversation_id: '123456',
  is_owner: false,
  is_embedded: false,
}

export const IsEmbedded = Template.bind({})
IsEmbedded.args = {
  ...Default.args,
  is_embedded: true
}

export const IsOwner = Template.bind({})
IsOwner.args = {
  ...Default.args,
  is_owner: true
}
