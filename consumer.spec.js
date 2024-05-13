import path from 'path';
import { Pact } from '@pact-foundation/pact';
import { expect } from 'chai';
import { getProviderData } from './consumer.js';

describe('Pact with Provider', () => {
    const provider = new Pact({
        port: 8081,
        consumer: 'Consumer',
        provider: 'Provider',
        log: path.resolve(process.cwd(), 'logs', 'pact.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        logLevel: 'INFO',
    });

    before(() => provider.setup());

    after(() => provider.finalize());

    describe('when a call to the provider is made', () => {
        before(() => {
            return provider.addInteraction({
                uponReceiving: 'a request for provider data',
                withRequest: {
                    method: 'GET',
                    path: '/provider',
                },
                willRespondWith: {
                    status: 200,
                    body: { valid: true },
                },
            });
        });

        it('should return the correct data', async () => {
            const response = await getProviderData();
            expect(response).to.eql({ valid: true });
            return provider.verify();
        });
    });
});