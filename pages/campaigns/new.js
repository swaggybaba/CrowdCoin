import React, { Component } from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'

import Layout from '../../components/layout'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import { Router } from '../../routes'

export default class New extends Component {
    state={
        minimumContibution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContibution)
                .send({
                    from: accounts[0]
                });
            
            Router.pushRoute('/');
        } catch(err){
            this.setState({ errorMessage: err.message })
        }

        this.setState({loading: false});
    }

    render() {
        return (
            <Layout>
                <h3>Create Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei"
                            labelPosition="right" 
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({minimumContibution: event.target.value})}
                        />
                    </Form.Field>
                    <Message error>
                        <Message.Header>Oops!</Message.Header>
                        <p>{this.state.errorMessage}</p>
                    </Message>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}
