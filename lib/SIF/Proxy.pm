package SIF::Proxy;
use perl5i::2;
use Dancer ':syntax';
use Dancer::Plugin::REST;
use DateTime;
use SIF::REST;

our $VERSION = '0.1';
prefix undef;
#set serializer => 'JSON';
#set session => 'YAML';

sub client {
	our $client;
	if (!defined $client) {
		$client = SIF::REST->new({
			endpoint => 'http://rest3api.sifassociation.org/api',
			# XXX Make this config, or even allow as input
			solutionId => 'auTestSolution',
		});
		$client->setupRest();
	}
	return $client;
}

# ------------------------------------------------------------------------------
# Instructions
# ------------------------------------------------------------------------------
get '/' => sub {
    template 'index';
};

get '/token' => sub {
	return {
		token => client()->sessionToken,
		# date => session('authorizationDate'). "",
	};
};

# ------------------------------------------------------------------------------
# The API
# ------------------------------------------------------------------------------
get '/api' => sub {
	return {
		success => true,
	};
};

#get qr{/api/(.+$)} => sub {

get '/api/:object' => sub {
	header('Content-Type' => 'application/xml');
	return client()->get(params->{object});
};
get '/api/:object/:id' => sub {
	header('Content-Type' => 'application/xml');
	return client()->get(params->{object}, params->{id});
};

# TODO - add post, put, delete

true;
